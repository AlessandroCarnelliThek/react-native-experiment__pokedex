import React, { useState, useRef, useEffect } from 'react';
import {
    Animated,
    Easing,
    View,
    Text,
    Image,
    ActivityIndicator,

} from 'react-native';
//-------------------------------------------------
import LCD from './LCD'
//-------------------------------------------------

const LCD_D = React.memo(({
    currentPokemon = null,
    toggleLcdAnimationValue,
}) => {
    //:::::::::::::::::::::::::::
    console.log('RENDER LCD_D')
    //:::::::::::::::::::::::::::
    return (
        <LCD animatedValue={toggleLcdAnimationValue}>
            {
                (currentPokemon)
                    ?
                    <View style={[
                        { width: '100%', flex: 1 },
                        { justifyContent: 'center', alignItems: 'center' }
                    ]}>
                        {/* :::::::::::::::::::::::::::::::::::::::::::::: */}
                        <Image
                            source={{ uri: currentPokemon.sprite_front }}
                            resizeMode={'contain'}
                            style={[
                                { width: '90%', height: '90%' },
                                { position: 'absolute' },
                            ]} />
                        {/* :::::::::::::::::::::::::::::::::::::::::::::: */}
                    </View>

                    : <ActivityIndicator size={40} color={'#222'} />
            }
        </LCD >

    )
})

export default LCD_D
