import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'
import InfoCard from 'vtex.store-components/InfoCard'
import { useQuery } from 'react-apollo'

import { SliderLayout } from 'vtex.slider-layout'

import QUERY_VALUE from './categories.gql'


const CSS_HANDLES = [
  'categoryLink',
  'categoryLinkContainer',
  'loading',
] as const

interface Props {
  classes: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function CategorySlider({ classes }: Props) {
  // Takes child categories from the graphQL and puts them into an infocard array
  function buildSlides(children: any){

    let output = []

    for (let i = 0; i < children.length; i++) {
      output.push(
        <InfoCard 
        className="ygs-ic-racing"
        callToActionText={children[i].name}
        callToActionUrl={children[i].href}
        headline=""
        imageUrl={"/arquivos/"+children[i].id+".jpg"}
        subhead=""
        textAlignment="center"
        textPosition="center"
         />
      )
    }
    // ACTUAL imageUrl={"/arquivos/"+children[i].id+".jpg"}
    // MOCK  imageUrl={"/arquivos/img-banner-1-dsk.jpg"}

    return output
  }

  const searchStuff = useSearchPage()
  const { handles } = useCssHandles(CSS_HANDLES, { classes })
  
  
  
  let slides:any='' //preconstruct,.. yeah any,.. i know,.. 

  let mycat = parseInt(searchStuff.params.id, 10) || false
  if(mycat){
      if(searchStuff.map=="c" || searchStuff.map=="c,c" || searchStuff.map=="c,c,c") // we are on a category page, but not the final level. let's move on! 
      {
        if(searchStuff.map=="c,c,c"){
          mycat= findParent(mycat);
        }
          //we got our category id. Let's look up the children.

          const { data } = useQuery(QUERY_VALUE, {
            variables: { id: mycat }
          })

          //let's only get productive if we really got stuff
          if(typeof data != "undefined" && typeof data.category!= "undefined"){    
            if(data.category.children.length>0) // we got something. let's rock'n roll.
            {
                  slides=buildSlides(data.category.children)
            } 
          }
          // special case, we want to look for SIBLINGS! Lets figure
      }
} 

  function findParent(cat:number){
    /* console.log("finding trees") //the axios async approach. Hate it :D 
    console.log(cat)
    console.log(typeof cat)
    if(typeof cat == 'number') {
      const output= await axios.get('/api/catalog_system/pub/category/tree/3')
      console.log("gnarf")
      console.log(output)
      return  new Promise (resolve => { resolve(cat) } )
    }
    else return cat; */

    return Math.floor(cat / 100)
  }

  const ipp = { desktop: 5, tablet: 3, phone: 2 }

  return <SliderLayout 
  itemsPerPage={ipp}
  className={handles.categoryLinkContainer}
  infinite="true"
  showNavigationArrows="always"
  blockClass="ygs-sslider"
  >{slides}</SliderLayout>
}

export default CategorySlider
