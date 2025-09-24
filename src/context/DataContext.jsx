import { createContext, useContext, useState } from "react";
import axios from "axios";


export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);

    const fetchAllProducts = async() => {
        try {
            const res = await axios.get('https://dummyjson.com/products?limit=0')
            const productsData = res.data.products;
            setData(productsData);

        }catch (error) {
            console.error(error)
        }
    }

    const getUniqueCategory = (data, property) => {
        let newVal = data?.map((curElem) => {
            return curElem[property]
        })
        newVal = ["All", ...new Set(newVal)]
        return newVal
    }

    const categoryOnlyData = data ? getUniqueCategory(data, "category") : [];
    const brandOnlyData = data ? getUniqueCategory(data, "brand") : [];

    return (
        <DataContext.Provider value={{ data, setData, fetchAllProducts, categoryOnlyData, brandOnlyData }}>
            {children}
        </DataContext.Provider>
    )
}

export const getData = () => useContext(DataContext)
