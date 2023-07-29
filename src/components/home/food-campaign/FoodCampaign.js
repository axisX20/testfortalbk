import React, { memo, useRef, useState } from 'react'
import Slider from 'react-slick'
import { Box, Stack, Typography } from '@mui/material'
import { IconButton, Grid, CircularProgress } from '@mui/material'

import { useSelector } from 'react-redux'
import feature7 from '../../../../public/static/featurecatagori/image 17.png'
import FoodCard from '../../food-card/FoodCard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import FoodCardMoreButton from '../../food-card/FoodCardMoreButton'
import { useTranslation } from 'react-i18next'

import { AllRoutes } from '../../../AllRoutes'
import {
    CustomStackFullWidth,
    CustomViewAll,
    SliderCustom,
} from '../../../styled-components/CustomStyles.style'
import { useRouter } from 'next/router'
import CustomImageContainer from '../../CustomImageContainer'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { CustomTypography } from '../../custom-tables/Tables.style'
import {
    CustomGridWithBgColor,
    CustomIconButton,
    CustomSideOverLay,
} from './FoodCampaign.style'
import { onSingleErrorResponse } from '../../ErrorResponse'
import { foodCount } from '../../../utils/customFunctions'
import fire_image from '../../../../public/static/fire.svg'
import FoodCardShimmer from '../../food-card/FoodCarShimmer'
import { HandleNext, HandlePrev } from '../../CustomSliderIcon'
import Skeleton from '@mui/material/Skeleton'
//import SliderCustom from "../../custom-slider/SliderCustom";
const FoodCampaign = ({ data, isLoading }) => {
    const [hoverOn, setHoverOn] = useState(false)
    const { t } = useTranslation()
    const router = useRouter()
    const { global } = useSelector((state) => state.globalSettings)
    const theme = useTheme()
    const { campaignFoods } = useSelector((state) => state.storedData)
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const isMedium = useMediaQuery(theme.breakpoints.up('sm'))
    const foodCampaignSliderRef = useRef(null)
    const languageDirection = localStorage.getItem('direction')
    const settings = {
        speed: 500,
        slidesToShow: 4.7,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: hoverOn && <HandleNext />,
        prevArrow: hoverOn && <HandlePrev />,
        responsive: [
            {
                breakpoint: 3600,
                settings: {
                    slidesToShow: 4.7,
                    slidesToScroll: 1,
                    infinite: false,
                    // dots: true
                },
            },
            {
                breakpoint: 3200,
                settings: {
                    slidesToShow: 4.7,
                    slidesToScroll: 1,
                    infinite: false,
                    // dots: true
                },
            },
            {
                breakpoint: 2800,
                settings: {
                    slidesToShow: 4.7,
                    slidesToScroll: 1,
                    infinite: false,
                    // dots: true
                },
            },
            {
                breakpoint: 2400,
                settings: {
                    slidesToShow: 4.7,
                    slidesToScroll: 1,
                    infinite: false,
                    // dots: true
                },
            },
            {
                breakpoint: 2000,
                settings: {
                    slidesToShow: 4.7,
                    slidesToScroll: 1,
                    infinite: false,
                    // dots: true
                },
            },
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 4.7,
                    slidesToScroll: 1,
                    infinite: false,
                    // dots: true
                },
            },
            {
                breakpoint: 1340,
                settings: {
                    slidesToShow: 4.5,
                    slidesToScroll: 1,
                    infinite: false,
                    // dots: true
                },
            },
            {
                breakpoint: 1075,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: false,
                    // dots: true
                },
            },
            {
                breakpoint: 999,
                settings: {
                    slidesToShow: 3.5,
                    slidesToScroll: 1,
                    infinite: false,
                    // dots: true
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    // initialSlide: 2
                    infinite: false,
                },
            },
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 2,
                    initialSlide: 0,
                    infinite: false,
                },
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,

                    // dots: true
                    initialSlide: 0,
                    infinite: false,
                },
            },
        ],
    }

    return (
        <>
            <Grid
                container
                paddingTop={campaignFoods?.length > 0 && '1.9rem'}
                gap="1.4rem"
            >
                {campaignFoods?.length > 0 && (
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <Stack direction="row" spacing={1}>
                            <Typography
                                variant="h3"
                                color={theme.palette.neutral[1000]}
                                fontWeight="500"
                            >
                                {t('Special Food Offers')}
                            </Typography>
                            <CustomImageContainer
                                src={fire_image.src}
                                width="26px"
                                height="26px"
                            />
                        </Stack>
                    </Grid>
                )}
                <CustomGridWithBgColor
                    foodsize={campaignFoods?.length}
                    item
                    container
                    xs={12}
                    md={12}
                    sm={12}
                    lg={12}
                    onMouseEnter={() => setHoverOn(true)}
                    onMouseLeave={() => setHoverOn(false)}
                >
                    {hoverOn && campaignFoods?.length >= 5 && (
                        <CustomSideOverLay left="unset" right="0" />
                    )}
                    <CustomStackFullWidth justifyContent="right">
                        {!isLoading ? (
                            <CustomStackFullWidth>
                                <SliderCustom
                                    languageDirection={languageDirection}
                                >
                                    <Slider
                                        ref={foodCampaignSliderRef}
                                        {...settings}
                                    >
                                        {campaignFoods?.map((product) => {
                                            if (
                                                product?.variations === null ||
                                                product?.variations[0]
                                                    ?.values ||
                                                product?.variations?.length ===
                                                    0
                                            ) {
                                                return (
                                                    <FoodCard
                                                        key={product?.id}
                                                        product={product}
                                                        productImageUrl={
                                                            global?.base_urls
                                                                ?.campaign_image_url
                                                        }
                                                        hasBackGroundSection="true"
                                                    />
                                                )
                                            }
                                        })}
                                        {/*{foodCount(campaignFoods) > 5 && (*/}
                                        {/*    <FoodCardMoreButton route="/campaigns" />*/}
                                        {/*)}*/}
                                    </Slider>
                                </SliderCustom>
                            </CustomStackFullWidth>
                        ) : (
                            <Stack marginTop="40px" spacing={2}>
                                <Skeleton
                                    variant="rectangular"
                                    width="400px"
                                    height="20px"
                                />
                                <SliderCustom>
                                    <Slider {...settings}>
                                        <FoodCardShimmer />
                                        <FoodCardShimmer />
                                        <FoodCardShimmer />
                                        <FoodCardShimmer />
                                        <FoodCardShimmer />
                                    </Slider>
                                </SliderCustom>
                            </Stack>
                        )}
                    </CustomStackFullWidth>
                </CustomGridWithBgColor>
            </Grid>
        </>
    )
}

export default memo(FoodCampaign)
