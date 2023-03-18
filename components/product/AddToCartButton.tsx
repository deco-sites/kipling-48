import Button from "$store/components/ui/Button.tsx";
import { useAddToCart } from "$store/sdk/useAddToCart.ts";

interface Props {
  skuId: string;
  sellerId: string;
}

function AddToCartButton({ skuId, sellerId }: Props) {
  const props = useAddToCart({
    skuId,
    sellerId,
  });

  return (
    <Button
      {...props}
      class="w-full"
      style={{
        background: "#88b04b",
        textTransform: "uppercase",
        color: "white",
      }}
    >
      Adicionar ao carrinho
    </Button>
  );
}

export default AddToCartButton;
