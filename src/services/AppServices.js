class AppServices {
    getResources = async (url) => {
            let res = await fetch(url)
            if (!res.ok) {
                throw new Error (`Could not fetch ${url}, status ${res.status}`);
            }
            return await res.json();
    }

    // CORRECT VARIANT
    getPeopleData = async () => {
        const finishedData = await this.getResources('https://swapi.dev/api/people/');
        return finishedData.results.map((data) => {
            return {
                name: data.name,
                image: `https://starwars-visualguide.com/assets/img/characters/${data.url.match(/[0-9]/gm).join('')}.jpg`,
            }
        }).splice(0, 9)
    }
    // getPeopleData = async () => {
    //     const finishedData = await this.getResources('https://swapi.dev/api/people/');
    //     for (let data of finishedData.results) {
    //         for (let newData of data.films) {
    //             data.films = []
    //             const filmRes = await this.getResources(newData)
    //             data.films.push(filmRes)
    //         }
    //         return {
    //             name: data.name,
    //             image: `https://starwars-visualguide.com/assets/img/characters/${data.url.match(/[0-9]/gm).join('')}.jpg`,
    //             films: data.films
    //         }
    //     }
        // return finishedData.results.map((data) => {
        //     return {
        //         name: data.name,
        //         image: `https://starwars-visualguide.com/assets/img/characters/${data.url.match(/[0-9]/gm).join('')}.jpg`,
        //         films: data.films
        //     }
        // }).splice(0, 9)
    // }
//correct var
    getPersonInfo = async (id) => {
        const finishedData = await this.getResources(`https://swapi.dev/api/people/${id}`);
        console.log(finishedData)
        let newFilmArr = [];
        for (let personData of finishedData.films) {
            let fetchData = await this.getResources(personData)
            newFilmArr.push(fetchData)
        }
        let newStarshipsArr = [];
        for (let personData of finishedData.starships) {
            let fetchData = await this.getResources(personData)
            newStarshipsArr.push(fetchData)
        }
        let homeWorldResp = await this.getResources(finishedData.homeworld);
        let homeWorld = homeWorldResp.name;
        

        return {
            name: finishedData.name,
            birth: finishedData.birth_year,
            height: finishedData.height,
            homeworld: homeWorld,
            mass: finishedData.mass,
            image: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
            films: newFilmArr,
            starships: newStarshipsArr,
        }
    }
}

export default AppServices;