class AppServices {
    getResources = async (url) => {
            let res = await fetch(url)
            if (!res.ok) {
                throw new Error (`Could not fetch ${url}, status ${res.status}`);
            }
            return await res.json();
    }

    getPeopleData = async () => {
        const finishedData = await this.getResources('https://swapi.dev/api/people/');
        return finishedData.results.map((data) => {
            return {
                name: data.name,
                image: `https://starwars-visualguide.com/assets/img/characters/${data.url.match(/[0-9]/gm).join('')}.jpg`,
            }
        })
    }

    // formPeopleData = (peopleData) => {
    //     console.log(peopleData.results.forEach((data) => {
    //         return {
    //             name: data.name,
    //             image: `https://starwars-visualguide.com/assets/img/characters/${data.url.match(/[0-9]/gm).join('')}.jpg`,
    //         }
    //     }))
    // }
    // getPeopleData = () => {
    //     this.getResources('https://swapi.dev/api/people/')
    //     .then((data) => {
    //         return data.results.forEach((el) => {
    //             el.films.forEach((item) => {
    //                 fetch(item)
    //                 .then(res => res.json())
    //                 .then(data => console.log(data))
    //             })
    //         })
    //     })

    // }
}

export default AppServices;