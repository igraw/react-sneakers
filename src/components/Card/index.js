import React, { useState } from "react"
import styles from "./Card.module.scss"

function Card({imageUrl, title, price, onFavorite, onPlus}) {
    const [isAdded, setisAdded]= useState(false)
    const onClickPlus = ()=>{
        onPlus({imageUrl, title, price})
        setisAdded(!isAdded)
    }
    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onFavorite}>
                <img src="/img/heart-unliked.svg" alt="Unliked" />
            </div>
            <img width={133} height={112} src={imageUrl} alt="Sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб</b>
                </div>
                <img className={styles.plus} onClick={onClickPlus}  src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg" } alt="plus" />

            </div>
        </div>
    )
}

export default Card