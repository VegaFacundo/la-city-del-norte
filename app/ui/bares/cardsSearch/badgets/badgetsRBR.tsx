import { rostyBarRestaResponseBares } from '@/app/lib/types/definitions'
import FoodTypesBadgets from './foodTypesBadgets'
import MotorBikeSVG from '@/public/images/bares/delivery-motorbike.svg'
import Image from 'next/image'

const BadgetsRBR = ({
  rostyBarResta,
}: {
  rostyBarResta: rostyBarRestaResponseBares
}) => {
  const delibery = rostyBarResta.restAtributtes.find(
    (restAttribute) => restAttribute.rest_attributes.name == 'Delivery'
  )
  return (
    <div className="flex flex-wrap">
      {delibery && (
        <div className="px-1">
          <Image
            src={MotorBikeSVG}
            width={24}
            height={24}
            className="w-6 h-6"
            alt="Patty icono"
            title={delibery.value}
            data-te-toggle="tooltip"
            data-te-placement="bottom"
            data-te-target="tooltip"
            color="white"
          />
        </div>
      )}

      <FoodTypesBadgets foodTypes={rostyBarResta.foodTypes} />
    </div>
  )
}

export default BadgetsRBR
