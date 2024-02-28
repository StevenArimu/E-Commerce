import { FC } from "react";
import { CartProductType } from "../product/[productId]/ProductDetails";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";
import { turnCateText } from "@/utils/trunCateText";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";


interface ItemContentPros {
    item: CartProductType
}


const ItemContent: FC<ItemContentPros> = ({ item }) => {
    const { handleRemoveProductFromCart, handelCartQtyIncrease, handelCartQtyDecrease } = useCart()
    return (
        <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-[1.5px] border-slate-200 py-4 items-center">
            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
                <Link href={`/product/${item.id}`}>
                    <div className="relative w-[70px] aspect-square">
                        <Image fill src={item.selectedImg.image} alt={item.name} className="object-contain" />
                    </div>
                </Link>
                <div className="flex flex-col justify-between">
                    <Link href={`/product/${item.id}`}>{turnCateText(item.name)}</Link>
                    <div>{item.selectedImg.color}</div>
                    <div className="w-[70px]">
                        <button className="text-slate-500 underline" onClick={() => handleRemoveProductFromCart(item)}>Remove</button>
                    </div>
                </div>
            </div>
            <div className="justify-self-center">{formatPrice(item.price)}</div>
            <div className="justify-self-center">
                <SetQuantity
                    cartCounter={true}
                    cartProduct={item}
                    handleQtyDecrease={() => handelCartQtyDecrease(item)}
                    handleQtyIncrease={() => handelCartQtyIncrease(item)}
                />
            </div>
            <div className="justify-self-end font-semibold">
                {formatPrice(item.price * item.quantity)}
            </div>
        </div>
    );
}

export default ItemContent;