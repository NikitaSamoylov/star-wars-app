const AppServices = () => {

    const getResources = async(url) => {
        let res = await fetch(url)
        if (!res.ok) {
            throw new Error (`Could not fetch ${ url }, status ${ res.status }`);
        }
        
        return await res.json();
    }

    const getPeopleData = async(page=1) => {
        const finishedData = await getResources(`https://swapi.dev/api/people/?page=${page}`);
        return finishedData.results.map((data) => {
            return {
                name: data.name,
                image: `https://starwars-visualguide.com/assets/img/characters/${data.url.match(/[0-9]/gm).join('')}.jpg`,
                isActive: false,
            }
        }).splice(0, 9)
    }

    const getPersonInfo = async(id, setSearchStatusMsg) => {
        const finishedData = await getResources(`https://swapi.dev/api/people/${id}`);

        let newFilmArr = [];
        for (let personData of finishedData.films) {
            setSearchStatusMsg('Getting films ...')
            let fetchData = await getResources(personData)
            newFilmArr.push(fetchData)
        }

        let newStarshipsArr = [];
        for (let personData of finishedData.starships) {
            setSearchStatusMsg('Getting starships ...')
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

    const getFilmsList = async() => {
        const data = await getResources('https://swapi.dev/api/films/');

        return data.results.map((elem) => {
            const id = elem.url.match(/[0-9]/gm).join('');
            return {
                id: id,
                title: elem.title,
                filmsImg: `https://starwars-visualguide.com/assets/img/films/${id}.jpg`,
                isActive: false,
            }
        })
    }

    const getChoosenFilm = async(id) => {
        const data = await getResources(`https://swapi.dev/api/films/${id}`);

        return {
            title: data.title,
            descr: data.opening_crawl,
            release: data.release_date,
            poster: `https://starwars-visualguide.com/assets/img/films/${id}.jpg`,
        }
    }

    const searchPerson = async(value) => {
        const data = await getResources(`https://swapi.dev/api/people/?search=${value}`);

        if (data.count >= 1) {
            const id = data.results[0].url.match(/[0-9]/gm).join('');
            return {
                id: id,
                name: data.results[0].name,
            };
        } else {
            return {
                id: '',
                name: 'not found',
            };
        }
    }

    return {
        getPeopleData,
        getPersonInfo,
        getFilmsList,
        getChoosenFilm,
        searchPerson,
    }
}

export default AppServices;