import React, { useState, useEffect } from 'react'

import Select from 'react-select'
import makeAnimated from 'react-select/animated';

import { fetchListOf } from '../helpers'

const animatedComponents = makeAnimated();

// let the user select multiple training sessions/programs
export default function MultiSelector({ updateListOfParent, chosenItems, itemsBelongTo }) {
    const [itemList, setItemList] = useState([])

    useEffect(() => {
        fetchListOf(itemsBelongTo)
            .then(({ data: list }) => setItemList(list))
    }, [])
    return (
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={chosenItems}
            isMulti placeholder="Select a session..."
            options={itemList}
            noOptionsMessage={() => "All the available options have been selected, there is nothing else to select"}
            getOptionValue={(option) => option._id} // by default, react-select search for 'value' key --> make the '_id' as its alias
            getOptionLabel={(option) => option.name} // by default, react-select search for 'label' key --> make the 'name as its alias
            onChange={(currentChosenItems) => updateListOfParent(currentChosenItems)}
        // items can be either training sessions or training programs
        />
        // Remember that the keys are in the following format by default --> itemList = [{value: ..., label: ...}, {}, ...]
    )
}
