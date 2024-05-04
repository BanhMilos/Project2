import { View, FlatList, StyleSheet, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import slide from './slide';
import OnboardingItem from './OnboardingItem';

const Onboarding = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;  
    const viewableItemsChanged = useRef(({ viewableItems}) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current;
    const slidesRef = useRef(null)
  return (
    <View style= {styles.container}>
        <View style={{flex : 3}}> 
        <FlatList 
        data={slide} 
        renderItem={({item}) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([{nativeEvent : {contentOffset : {x : scrollX } } } ], {
            useNativeDriver: false,
        })}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
        />

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    description : {

    }
})

export default Onboarding