"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaces = void 0;
function getPlaces(searchParams) {
    return __awaiter(this, void 0, void 0, function* () {
        let allResults = [];
        const baseURL = new URL("https://rest.arbeitsagentur.de/infosysbub/studisu/pc/v1/studienangebote");
        Object.keys(searchParams).forEach((key) => baseURL.searchParams.append(key, searchParams[key]));
        try {
            const response = yield fetch(baseURL, {
                method: "GET",
                headers: {
                    "X-API-Key": "5aee2cfe-1709-48a9-951d-eb48f8f73a74",
                },
            });
            const data = yield response.json();
            if (!data.maxErgebnisse) {
                throw new Error("No results found");
            }
            const numberOfRequests = Math.ceil(data.maxErgebnisse / 20);
            const requests = [];
            if (numberOfRequests > 1) {
                for (let i = 1; i < numberOfRequests; i++) {
                    const url = new URL("https://rest.arbeitsagentur.de/infosysbub/studisu/pc/v1/studienangebote");
                    Object.keys(searchParams).forEach((key) => url.searchParams.append(key, searchParams[key]));
                    url.searchParams.append("pg", (i + 1).toString());
                    requests.push(fetch(url, {
                        method: "GET",
                        headers: {
                            "X-API-Key": "5aee2cfe-1709-48a9-951d-eb48f8f73a74",
                        },
                    })
                        .then((response) => response.json())
                        .then((data) => data.items)
                        .catch((error) => {
                        console.log(error);
                    }));
                }
                const resultsArray = yield Promise.all(requests);
                allResults = data.items
                    .concat(...resultsArray)
                    .filter((item) => item === null || item === void 0 ? void 0 : item.studienangebot.studienort.location);
            }
            else {
                allResults = data.items.filter((item) => item === null || item === void 0 ? void 0 : item.studienangebot.studienort.location);
            }
            console.table({
                baseURL: baseURL.toString(),
                numberOfRequests: numberOfRequests,
                allResults: allResults.length,
                maxErgebnisse: data.maxErgebnisse,
                itemsPerPage: data.items.length,
            });
            return {
                items: allResults,
                maxErgebnisse: data.maxErgebnisse,
            };
        }
        catch (error) {
            if (error.message === "No results found")
                return {
                    items: [],
                    maxErgebnisse: 0,
                };
            else {
                console.log("unexpected error ", error);
                throw new Error("An unexpected error occurred" + error.message);
            }
        }
    });
}
exports.getPlaces = getPlaces;
