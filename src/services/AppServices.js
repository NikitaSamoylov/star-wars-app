// import { useCallback, useState } from "react";

const AppServices = () => {
    // const [respData, setRespData] = useState(null);

    const getResources = async(url) => {
        let res = await fetch(url)
        if (!res.ok) {
            throw new Error (`Could not fetch ${url}, status ${res.status}`);
        }
        
        return await res.json();
    }

    const getPeopleData = async(page=1) => {
        console.log('list data render')
        const finishedData = await getResources(`https://swapi.dev/api/people/?page=${page}`);
        return finishedData.results.map((data) => {
            // setRespData(data)
            return {
                name: data.name,
                image: `https://starwars-visualguide.com/assets/img/characters/${data.url.match(/[0-9]/gm).join('')}.jpg`,
                isActive: false,
            }
        }).splice(0, 9)
    }

    const getPersonInfo = async (id) => {
        console.log('person info render')
        const finishedData = await getResources(`https://swapi.dev/api/people/${id}`);
        let newFilmArr = [];
        for (let personData of finishedData.films) {
            let fetchData = await getResources(personData)
            newFilmArr.push(fetchData)
        }
        let newStarshipsArr = [];
        for (let personData of finishedData.starships) {
            let fetchData = await getResources(personData)
            newStarshipsArr.push(fetchData)
        }
        let homeWorldResp = await getResources(finishedData.homeworld);
        let homeWorld = homeWorldResp.name;

        return {
            id: id,
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

    return {
        getPeopleData,
        getPersonInfo,
    }
}

export default AppServices;