export default function HeroProductInfo({ product, onView }) {
  return (
    <div className="flex flex-col items-center px-2 text-center">
      <p className="text-[10px] tracking-[0.22em] text-ink uppercase">{product.name}</p>
      <p className="mt-2 flex items-center gap-2 text-[10px] tracking-[0.18em] text-stone uppercase">
        <span
          className="inline-block size-1.5 shrink-0 rounded-full border border-ink/15"
          style={{ backgroundColor: product.colorHex }}
        />
        {product.colorName}
      </p>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          onView(product.id)
        }}
        className="mt-3 border border-ink/80 px-4 py-2 text-[10px] tracking-[0.2em] text-ink uppercase transition-colors duration-300 hover:bg-ink hover:text-[#F0E8D9]"
      >
        View Product
      </button>
    </div>
  )
}
