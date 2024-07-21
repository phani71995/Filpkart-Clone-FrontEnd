import React from 'react'
import HorizentalProduct from './Home/HorizentalProduct'

const Mobiles = () => {
    const mobileLableArr =
        [
            {
                title: "UP COMING SALE",
                img:
                    [
                        {
                            id: 1,
                            img: "https://rukminim2.flixcart.com/fk-p-flap/844/140/image/b3b62abdc4db2411.jpg?q=50"

                        },
                        {
                            id: 2,
                            img: "https://rukminim2.flixcart.com/fk-p-flap/844/140/image/d8edc89825751dc1.jpg?q=50"

                        }


                    ]

            },
            {
                title: "UPCOMING LANCHES",
                img:
                    [
                        {
                            id: 1,
                            img: "https://rukminim2.flixcart.com/fk-p-flap/844/140/image/2bc9891868919ba5.jpg?q=50"

                        },
                        {
                            id: 2,
                            img: "https://rukminim2.flixcart.com/fk-p-flap/844/140/image/45bfaca8a90fac0e.jpg?q=50"

                        },
                        {
                            id: 3,
                            img: "https://rukminim2.flixcart.com/fk-p-flap/844/140/image/e2887d805b95e541.jpg?q=50"

                        }, {
                            id: 4,
                            img: "https://rukminim2.flixcart.com/fk-p-flap/844/140/image/8573ab9e6fd13b34.jpg?q=50"

                        }, {
                            id: 5,
                            img: "https://rukminim2.flixcart.com/fk-p-flap/844/140/image/c3ef482cc5f1fe83.jpg?q=50"

                        }


                    ]

            },
            {
                title: "JEST LANCHED",
                img:
                    [
                        {
                            id: 1,
                            img: "https://rukminim2.flixcart.com/fk-p-flap/844/140/image/e968292124c6aac3.jpg?q=50"

                        },
                        {
                            id: 2,
                            img: "https://rukminim2.flixcart.com/fk-p-flap/844/140/image/6a13d288ad7a087b.jpg?q=50"

                        },
                        {
                            id: 3,
                            img: "https://rukminim2.flixcart.com/fk-p-flap/844/140/image/27ad149f768f4a0e.jpg?q=50"

                        },
                        {
                            id: 4,
                            img: "https://rukminim2.flixcart.com/fk-p-flap/844/140/image/e38c5f608eaac928.jpg?q=50"

                        }, {
                            id: 5,
                            img: "https://rukminim2.flixcart.com/fk-p-flap/844/140/image/1557b7a0233798c6.jpg?q=50"

                        },
                        {
                            id: 6,
                            img: "https://rukminim2.flixcart.com/fk-p-flap/844/140/image/19fa1370d0154baf.jpg?q=50"

                        }, {
                            id: 7,
                            img: "https://rukminim2.flixcart.com/fk-p-flap/844/140/image/aa9db65f6bbbff68.jpg?q=50"

                        }, {
                            id: 8,
                            img: "https://rukminim2.flixcart.com/fk-p-flap/844/140/image/fe47007b198b6e52.jpg?q=50"

                        }, {
                            id: 9,
                            img: "https://rukminim2.flixcart.com/fk-p-flap/844/140/image/3e965adede348587.jpg?q=50"

                        },


                    ]

            }


        ]
    return (
        <>
            <div className='mobileMainSection'>
                <div className='' style={{ width: 'auto', height: 'auto' }}>
                    <img src="https://rukminim2.flixcart.com/fk-p-flap/100/100/image/8e07d9d22bf15432.jpg?q=50" alt="" style={{ width: '100%', height: 'auto', imageRendering: 'auto' }} />
                </div>

                {
                    mobileLableArr.map((item) => {

                        return (
                            <>
                                <div className='mobileHeadings'>
                                    {item.title}
                                </div>
                                {item.img.map((imges) => (<div className='mobileImagDev'>
                                    <img src={imges.img} alt={imges.id} />
                                </div>))}

                            </>
                        )





                    }


                    )

                }

                < HorizentalProduct category="mobiles" title="Top mobiles" />
            </div >

        </>
    )
}

export default Mobiles
