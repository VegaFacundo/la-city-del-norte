import PizzaSVG from '@/public/images/bares/pizza.svg'
import PattySVG from '@/public/images/bares/patty.svg'
import SandwichSVG from '@/public/images/bares/sandwich.svg'

import Image from 'next/image'
const FoodTypesBadgets = ({
  foodTypes,
}: {
  foodTypes: { food_type: { name: string } }[]
}) => {
  if (!foodTypes || foodTypes.length == 0) {
    return null
  }
  return (
    <div className="flex">
      {foodTypes.map((foodTypeItem, index) => {
        return (
          <div
            key={`food-types-badgets-${index}-${foodTypeItem.food_type.name}`}
            className="px-1"
          >
            {foodTypeItem.food_type.name == 'pizza' && (
              <Image
                src={PizzaSVG}
                width={24}
                height={24}
                className="w-6 h-6"
                alt="Pizza icono"
                title="Pizza"
                data-te-toggle="tooltip"
                data-te-placement="bottom"
                data-te-target="tooltip"
              />
            )}

            {foodTypeItem.food_type.name == 'sandwich' && (
              <Image
                src={SandwichSVG}
                width={24}
                height={24}
                className="w-6 h-6"
                alt="Sandwich icono"
                title="Sandwich"
                data-te-toggle="tooltip"
                data-te-placement="bottom"
                data-te-target="tooltip"
              />
            )}

            {foodTypeItem.food_type.name == 'patty' && (
              <Image
                src={PattySVG}
                width={24}
                height={24}
                className="w-6 h-6"
                alt="Patty icono"
                title="Empanadas"
                data-te-toggle="tooltip"
                data-te-placement="bottom"
                data-te-target="tooltip"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default FoodTypesBadgets
