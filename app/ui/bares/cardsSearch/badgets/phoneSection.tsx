import { rostyBarRestaResponseBares } from '@/app/lib/types/definitions'
import WhatsApp from './whatsapp'

const PhoneSection = ({
  rostyBarResta,
}: {
  rostyBarResta: rostyBarRestaResponseBares
}) => {
  const isPhone = rostyBarResta.phone

  const whatsapp = rostyBarResta.restAtributtes.find(
    (restAttribute) => restAttribute.rest_attributes.name == 'Whatsapp'
  )

  const isPhoneOrWhatsApp = isPhone || whatsapp

  if (!isPhoneOrWhatsApp) return false

  return (
    <div className="pl-1 pt-2">
      {isPhone && !whatsapp && rostyBarResta.phone}
      {whatsapp && <WhatsApp phone={whatsapp.value} />}
    </div>
  )
}

export default PhoneSection
