import React from "react";
// import { useSelector, useActions } from 'react-redux';
import { useSelector } from "react-redux";
import MyInfo from '../components/MyInfo'
import * as Actions from '../store/actions'

const PlacementStateContainer = () => {
    const placement = useSelector(state => state.placementCounter, []);

    return (
        <MyInfo
            next={Actions.nextPlacementState}
            previous={Actions.previousPlacementState}
            placement={placement.placementState}
        >
            {placement.placement}
        </MyInfo>
    );
}

export default PlacementStateContainer;