import React, {useState} from "react";
import { View, TextInput, FlatList, NativeSyntheticEvent, TextInputChangeEventData } from "react-native/types";

const Dictionary: React.FC=()=>{
    const [abName, setAbName]=useState<string>("")

    const changeHandler=(e:NativeSyntheticEvent<TextInputChangeEventData>)=>{
        setAbName(e.nativeEvent.text)
    }

    return(
        <View>
            <TextInput placeholder="Search for an Ability" onChange={changeHandler}/>
            {/* <FlatList></FlatList> */}
        </View>
    )
}