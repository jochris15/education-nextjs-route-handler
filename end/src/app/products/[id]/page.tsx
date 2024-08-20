import { ProductType } from "@/type"
import Link from 'next/link'

export default async function DetailProduct({ params }: { params: { id: number } }) {
    const response = await fetch(`https://dummyjson.com/products/${params.id}`, { cache: 'no-store' })
    const data: ProductType = await response.json()

    return (
        <>
            <div className="h-screen flex justify-center items-center">
                <div className="card glass w-1/2 p-5">
                    <figure>
                        <img
                            src={data.thumbnail}
                            alt="data!" />
                    </figure>
                    <div className="card-body">
                        <h1 className="card-title">{data.title}</h1>
                        <p>{data.description}</p>
                        <Link href='/products' className="btn btn-primary mt-10">Back to products</Link>
                    </div>
                </div>
            </div>
        </>
    )
}