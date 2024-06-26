import './people-item.scss';

const PeopleItem = (props) => {
    const {image, name, clickItem, isActive} = props;
    const peopleItemClass = isActive
                                    ? "people-list__item people-item clicked-item"
                                    : "people-list__item people-item"

    return (
        <>
            <li className={peopleItemClass} onClick={clickItem} tabIndex={5}>
            <img className="people-item__img" src={image} alt="avatar"/>
            <h2 className="people-item__name">{name}</h2>
            </li>
        </>
    )
}

export default PeopleItem;