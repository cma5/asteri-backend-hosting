export async function getPlaces(searchParams: any) {
  let allResults: any[] = [];
  const baseURL = new URL(
    "https://rest.arbeitsagentur.de/infosysbub/studisu/pc/v1/studienangebote"
  );
  Object.keys(searchParams).forEach((key) =>
    baseURL.searchParams.append(key, searchParams[key])
  );
  try {
    const response = await fetch(baseURL, {
      method: "GET",
      headers: {
        // Key is public on the github repo https://github.com/bundesAPI/jobsuche-api
        "X-API-Key": "5aee2cfe-1709-48a9-951d-eb48f8f73a74",
      },
    });

    const data = await response.json();

    if (!data.maxErgebnisse) {
      throw new Error("No results found");
    }

    const numberOfRequests = Math.ceil(data.maxErgebnisse / 20); // 20 max per request
    const requests = [];
    if (numberOfRequests > 1) {
      for (let i = 1; i < numberOfRequests; i++) {
        const url = new URL(
          "https://rest.arbeitsagentur.de/infosysbub/studisu/pc/v1/studienangebote"
        );
        Object.keys(searchParams).forEach((key) =>
          url.searchParams.append(key, searchParams[key])
        );
        url.searchParams.append("pg", (i + 1).toString());
        requests.push(
          fetch(url, {
            method: "GET",
            headers: {
              // Key is public on the github repo
              "X-API-Key": "5aee2cfe-1709-48a9-951d-eb48f8f73a74",
            },
          })
            .then((response) => response.json())
            .then((data) => data.items)
            .catch((error) => {
              console.log(error);
            })
        );
      }

      const resultsArray = await Promise.all(requests);
      allResults = data.items
        .concat(...resultsArray)
        .filter((item: any) => item?.studienangebot.studienort.location);
    } else {
      allResults = data.items.filter(
        (item: any) => item?.studienangebot.studienort.location
      );
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
  } catch (error: any) {
    console.log("unexpected error ", error);
    throw new Error("An unexpected error occurred" + error.message);
  }
}
