'use client'

import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";


export const PlaceOrder = () => {

    const [loaded, setLoaded] = useState(false);

    const address = useAddressStore(state => state.address);

    const { itemsInCart, subTotal, tax, total } = useCartStore(useShallow(state => state.getSummaryInformation()))









    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) {
        return <p>Cargando...</p>
    }

    return (
        <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-2">Dirección de Entrega</h2>
            <div className="mb-10">
                <p className="text-xl">{address.firstName} {address.lastName}</p>
                <p>{address.address}</p>
                <p>{address.address2}</p>
                <p>{address.postalCode}</p>
                <p>{address.city}, {address.country}</p>
                <p>{address.phone}</p>
            </div>

            {/* Divider */}
            <div
                className="w-full h-0.5 rounded bg-gray-200 mb-10"
            />

            <h2 className="text-2xl mb-2"> Resumen de Orden </h2>

            <div className="grid grid-cols-2">

                <span>No.Productos</span>
                <span className="text-right">{itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}</span>

                <span>Subtotal</span>
                <span className="text-right">{currencyFormat(subTotal)}</span>

                <span>Impuestos (15%)</span>
                <span className="text-right">{currencyFormat(tax)}</span>

                <span className="mt-5 text-2xl">Total:</span>
                <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>

            </div>

            <div className="mt-5 mb-2 w-full">

                {/* Disclaimer */}
                <p className="mb-5">
                    <span className="text-xs">
                        Al hacer click en &quot;Colocar Orden&quot;, aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a>
                    </span>
                </p>

                <button
                    // href="/orders/123"
                    className="flex btn-primary justify-center"
                >
                    Colocar Orden
                </button>

            </div>

        </div>
    )
}
