
import { Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";


export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">

        <Title title="Verificar Orden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar Elementos</span>
            <Link href='/cart' className="underline mb-5">
              Editar Carrito
            </Link>

            {/* Items */}
            <ProductsInCart/>
          </div>


          {/* Checkout - Resumen de Compra */}
          <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-2">Dirección de Entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Fernando Herrera</p>
              <p>Av. Siempre Viva 123</p>
              <p>Colonia Cnetor</p>
              <p>Alcaldía Cuauthemoc</p>
              <p>Ciudad de México</p>
              <p>CP. 2765892</p>
              <p>5765 876876 86678</p>
            </div>

            {/* Divider */}
            <div
              className="w-full h-0.5 rounded bg-gray-200 mb-10"
            />

            <h2 className="text-2xl mb-2"> Resumen de Orden </h2>

            <div className="grid grid-cols-2">

              <span>No.Productos</span>
              <span className="text-right">3 Artículos</span>

              <span>Subtotal</span>
              <span className="text-right">$100</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$100</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$100</span>

            </div>

            <div className="mt-5 mb-2 w-full">

              {/* Disclaimer */}
              <p className="mb-5">
                <span className="text-xs">
                  Al hacer click en &quot;Colocar Orden&quot;, aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a>
                </span>
              </p>

              <Link 
                className="flex btn-primary justify-center"
                href="/orders/123"
              >
                Colocar Orden
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}