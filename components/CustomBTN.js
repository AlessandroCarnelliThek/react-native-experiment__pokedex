import React, { useRef, useCallback } from 'react';
import { Dimensions, Animated, View, Pressable } from 'react-native';

const COLOR_SHADOW = '#543539Df'
const COLOR_OUTLINE = '#54353a'

const HIGHNESS = 5
const SPEED = 100
const SCREEN_WIDTH = Dimensions.get('screen').width
const GAP = SCREEN_WIDTH * .05
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);


const CustomBTN = ({
    children,
    width = 10,
    height = 10,
    borderRadius = 0,
    color,
    shadow = true,
    isActive,
    onPress,
}) => {

    const animatedValue = useRef(new Animated.Value(0)).current


    const translate = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, HIGHNESS]
    })

    const translateLight = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, height * .03]
    })


    const defaultAnimation = () => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: SPEED,
            useNativeDriver: true,
        }).start(() => handle_PRESS())
    }

    const pressAnimation = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: SPEED,
            useNativeDriver: true,
        }).start()
    }

    const handle_PRESS = useCallback(() => {
        onPress()
    }, [])


    console.log('RENDER CUSTOM_BTN')

    return (

        <View style={{ width: width, height: height, transform: [{ rotateX: '-10deg' }] }} >

            {/* SHADOW */}


            < View style={
                [
                    { width: width, height: height, borderRadius: borderRadius, backgroundColor: COLOR_SHADOW },
                    { position: 'absolute', opacity: .5 },
                    {
                        transform: [
                            { translateY: HIGHNESS },
                            { scaleX: shadow ? 1.1 : 0 },
                            { scaleY: shadow ? 1.2 : 0 }

                        ]
                    }
                ]} />
            {/* FAKE 3D */}
            < View style={
                [
                    { width: width, height: height, borderRadius: borderRadius, backgroundColor: COLOR_OUTLINE },
                    { position: 'absolute' },

                    {
                        transform: [
                            { translateY: HIGHNESS },
                            { scale: 1 }
                        ]
                    }
                ]} />

            {/* BTN */}
            < AnimatedPressable
                onPressIn={() => pressAnimation()}
                onPressOut={() => defaultAnimation()}
                style={
                    [
                        { width: width, height: height, borderRadius: borderRadius, borderWidth: 3 },
                        { borderColor: COLOR_OUTLINE, backgroundColor: color },
                        { justifyContent: 'center', alignItems: 'center' },
                        { marginBottom: GAP, overflow: 'hidden' },
                        { transform: [{ translateY: translate },] }
                    ]} >

                {children}
                {
                    isActive
                        ?
                        <>

                            <View style={[
                                { width: width, height: height, borderRadius: borderRadius },
                                { backgroundColor: '#fff', position: 'absolute' },
                                { opacity: .5 },
                                {
                                    transform: [
                                        { translateX: -5 },
                                        { translateY: -5 },
                                        { scale: .65 },
                                        { perspective: 1 },
                                    ]
                                }]} />
                            <View style={[
                                { width: width, height: height, borderRadius: borderRadius },
                                { backgroundColor: '#fff', position: 'absolute' },
                                { opacity: .5 },
                                {
                                    transform: [
                                        // { rotate: '-60deg' },
                                        { translateX: 0 },
                                        { translateY: 0 },
                                        { scale: 1.1 },
                                        { perspective: 1 },
                                    ]
                                }]} />
                            <View style={[
                                { width: width, height: height, borderRadius: borderRadius },
                                { backgroundColor: '#fff', position: 'absolute' },
                                { opacity: .5 },
                                {
                                    transform: [
                                        // { rotate: '-60deg' },
                                        { translateX: -15 },
                                        { translateY: -15 },
                                        { scale: .77 },
                                        { perspective: 1 },
                                    ]
                                }]} />

                            <Animated.View style={[
                                { width: width, height: height, borderRadius: borderRadius },
                                { backgroundColor: color, position: 'absolute' },
                                { opacity: .5 },
                                {
                                    transform: [
                                        { translateX: translateLight },
                                        { translateY: translateLight },
                                        { scale: .79 },
                                        { perspective: 1 },
                                    ]
                                }]} />
                        </>
                        : <></>
                }
            </AnimatedPressable >
        </View >
    )
}
export default React.memo(CustomBTN)
