import PizzaSVG from '@/public/images/bares/pizza.svg'
import PattySVG from '@/public/images/bares/patty.svg'
import SandwichSVG from '@/public/images/bares/sandwich.svg'
import BurgerSVG from '@/public/images/bares/burger.svg'
import PlateSVG from '@/public/images/bares/plate.svg'
import BeefSVG from '@/public/images/bares/beef.svg'
import SaladSVG from '@/public/images/bares/salad.svg'
import PieSVG from '@/public/images/bares/pie.svg'
import CakeSVG from '@/public/images/bares/cake.svg'
import CoffeSVG from '@/public/images/bares/coffe.svg'
import CupSVG from '@/public/images/bares/cup.svg'
import IceCreamSVG from '@/public/images/bares/ice-cream-cone.svg'
import Image from 'next/image'

const foodTypesSeed: { [key: string]: { name: string; icon: any } } = {
  Pizza: {
    name: 'Pizza',
    icon: PizzaSVG,
  },
  Sandwich: {
    name: 'Sandwich',
    icon: SandwichSVG,
  },
  Empanadas: {
    name: 'Empanadas',
    icon: PattySVG,
  },
  Hamburguesa: {
    name: 'Hamburguesa',
    icon: BurgerSVG,
  },
  'Al plato': {
    name: 'Al plato',
    icon: PlateSVG,
  },
  Asado: {
    name: 'Asado',
    icon: BeefSVG,
  },
  Ensadala: {
    name: 'Ensadala',
    icon: SaladSVG,
  },
  Tartas: {
    name: 'Tartas',
    icon: PieSVG,
  },
  Tortas: {
    name: 'Tortas',
    icon: CakeSVG,
  },
  'Meriendas/Desayunos': {
    name: 'Meriendas/Desayunos',
    icon: CoffeSVG,
  },
  Licuados: {
    name: 'Licuados',
    icon: CupSVG,
  },
  Helados: {
    name: 'Helados',
    icon: IceCreamSVG,
  },
}

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
        if (!foodTypesSeed[foodTypeItem.food_type.name]) return null
        return (
          <div
            key={`food-types-badgets-${index}-${foodTypeItem.food_type.name}`}
            className="px-1"
          >
            <Image
              src={foodTypesSeed[foodTypeItem.food_type.name].icon}
              width={24}
              height={24}
              className="w-6 h-6"
              alt="Patty icono"
              title={foodTypesSeed[foodTypeItem.food_type.name].name}
              data-te-toggle="tooltip"
              data-te-placement="bottom"
              data-te-target="tooltip"
            />
          </div>
        )
      })}
    </div>
  )
}

export default FoodTypesBadgets
