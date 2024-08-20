import { ProductType } from "@/type"
import Link from 'next/link'

export default function ProductCard({ product }: { product: ProductType }) {
    return (
        <>
            <div className="card glass w-96">
                <figure>
                    <img
                        src={product.thumbnail}
                        alt="product!" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{product.title}</h2>
                    <div className="card-actions justify-end">
                        <Link href={`/products/${product.id}`} className="btn btn-primary mt-5">Learn More!</Link>
                    </div>
                </div>
            </div>
        </>
    )
}