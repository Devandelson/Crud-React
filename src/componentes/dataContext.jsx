import { createContext, useState, useEffect } from "react";

export const dataContext = createContext(null);

export function ComponentDataConext({ children }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function funcionData() {
            try {
                const findData = await fetch('https://dummyjson.com/users');
                const data = await findData.json();
                const dataCustom = [];

                data.users.map((value) => {
                    const structureData = {
                        'id': value.id,
                        'nombre': value.firstName,
                        'apellido': value.lastName,
                        'tel': value.phone,
                        'img': value.image,
                        'visible': true
                    };

                    dataCustom.push(structureData);
                })

                setData(dataCustom);
            } catch (error) {
                console.log(error);
            }
        }

        funcionData();
    }, [])

    return (
        <dataContext.Provider value={{ data, setData }}>
            {children}
        </dataContext.Provider>
    )
}