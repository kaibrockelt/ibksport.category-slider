
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'
import { useQuery } from 'react-apollo' 
import QUERY_VALUE from './categories.gql'
import  InfoCard  from 'vtex.store-components/InfoCard'
import { SliderLayout } from 'vtex.slider-layout'







const CSS_HANDLES = [
  'categoryLink',
  'categoryLinkContainer',
  'loading',
] as const

interface Props {
  classes: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function CategorySlider({ classes }: Props) {

  //Takes child categories from the graphQL and puts them into an infocard array
  function buildSlides(children: any){
    console.log("constructing babies");
    console.log(children);
    let output=[];
    for(let i=0; i<children.length; i++){
      output.push(
        <InfoCard 
        className="ygs-ic-racing"
        callToActionText={children[i].name}
        headline=""
        imageUrl={"/arquivos/img-banner-1-dsk.jpg"}
        subhead=""
        textAlignment="center"
        textPosition="center"
        
        ></InfoCard>

      )
    }
    //OLD imageUrl={"/arquivos/"+children[i].id+".jpg"}
    return output
  }

  const  searchStuff  = useSearchPage()  
  const { handles } = useCssHandles(CSS_HANDLES, { classes })
  
  
  
  let slides:any='' //preconstruct,.. yeah any,.. i know,.. 

  if(searchStuff.map=="c" || searchStuff.map=="c,c") // we are on a category page, but not the final level. let's move on! 
  {
    const mycat=searchStuff.params.id || false;
    if(mycat){
      //we got our category id. Let's look up the children.
      console.log("querying category "+mycat)
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
    }
  }

  const ipp= { //items per page. 
    "desktop": 5,
    "tablet": 3,
    "phone": 2
  }
  


  return <SliderLayout 
  itemsPerPage={ipp}
  className={handles.categoryLinkContainer}
  infinite="true"
  showNavigationArrows="always"
  blockClass="ygs-sslider"
  >{slides}</SliderLayout>
}

export default CategorySlider
