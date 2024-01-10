import { baresSearchParamsType } from '@/app/lib/types/definitions'
import Image from 'next/image'
import styles from '@/app/ui/bares/cardsSearch/cardsSearch.module.css'
import WhatsApp from '@/app/ui/bares/cardsSearch/badgets/whatsapp'
import { getRostyBarsRestaurant } from '@/app/lib/data'
import IconLocation from './badgets/iconLocation'
import WorkTime from './badgets/workTime'
import BusinessTittleCard from './businessTittleCard'
import FoodTypesBadgets from './badgets/foodTypesBadgets'

const CardsSearch = async ({ query }: { query: baresSearchParamsType }) => {
  const rostisbarsResponse = await getRostyBarsRestaurant({ query })
  return (
    <section className="flex">
      <div className="basis-full md:basis-10/12	mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4 place-content-center">
        {rostisbarsResponse?.rostyBarResta.length > 0 &&
          rostisbarsResponse.rostyBarResta.map(
            (rostyBarResta: any, index: number) => {
              return (
                <div
                  key={`${index}-${rostyBarResta.name}`}
                  className={`md:max-h-80 ${styles.cardContainer}`}
                >
                  <div className="relative flex-grow flex flex-col justify-between text-gray-700 bg-white shadow-md bg-clip-border rounded-md  w-auto h-full text-white">
                    <div className="z-10 p-6 h-full flex-grow flex flex-col justify-between">
                      <div>
                        <BusinessTittleCard businessName={rostyBarResta.name} />
                        <div className=" pl-1 pt-2">
                          <WhatsApp phone={rostyBarResta.phone} />
                          {/* <div className="px-2">
                            <Instagram instagranLink="https://www.instagram.com/" />
                          </div> */}
                        </div>
                        <div className="py-1 pt-1">
                          <IconLocation
                            street={rostyBarResta.street}
                            streetNumber={rostyBarResta.street_number}
                          />
                        </div>
                        <div className="pl-1">
                          <FoodTypesBadgets
                            foodTypes={rostyBarResta.foodTypes}
                          />
                        </div>
                      </div>
                      <div className="pl-1">
                        <WorkTime workTime={rostyBarResta.work_time} />
                      </div>
                    </div>

                    <div className="absolute z-0 h-full w-full overflow-hidden shadow-lg bg-clip-border rounded-md bg-blue-gray-500 shadow-blue-gray-500/40">
                      <div
                        className={`relative w-full h-full ${styles.imagenContainer}`}
                      >
                        <Image
                          src="/images/comida2.jpg"
                          width={2000}
                          height={2000}
                          alt="Imagen de comida w-full max-h-full"
                          className={`${styles.backgroundImage}`}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          )}
      </div>
    </section>
  )
}

export default CardsSearch
