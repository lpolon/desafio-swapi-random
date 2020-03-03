export default class Swapi {
  constructor(resourceType) {
    this.baseUrl = 'https://swapi.co/api';
    this.resourceType = resourceType;
  }
  get endpoint() {
    return `${this.baseUrl}/${this.resourceType}`;
  }

  async getAllResources() {
    try {
      const response = await fetch(this.endpoint);
      const json = await response.json();
      const { count } = json;
      const numberOfPageResults = Math.ceil(count / 10);

      const endPointsArr = [];
      for (let i = 1; i <= numberOfPageResults; i += 1) {
        endPointsArr.push(`${this.endpoint}?page=${i}`);
      }
      const jsonArr = await Promise.all(
        endPointsArr.map(async (endpoint) => {
          const response = await fetch(endpoint);
          return response.json();
        })
      );
      return jsonArr.flatMap((json) => json.results);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
