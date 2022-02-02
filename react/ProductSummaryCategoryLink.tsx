import React from 'react'
import { ProductSummaryContext } from 'vtex.product-summary-context'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'

import styles from './productSummary.css'

const { useProductSummary } = ProductSummaryContext

const CSS_HANDLES = [
  'categoryLink',
  'categoryLinkContainer',
  'loading',
] as const

interface Props {
  classes: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function ProductSummaryCategoryLink({ classes }: Props) {
  const { product, isLoading } = useProductSummary()
  const { handles } = useCssHandles(CSS_HANDLES, { classes })
  const mylink = buildLink(product)

  if (isLoading) {
    return (
      <div
        className={`${handles.loading} flex items-end justify-end w-100 h1 pr6`}
      >
        <div className={styles.priceSpinner} />
      </div>
    )
  }

  function blocklink(e: any) {
    e.stopPropagation()
  }

  function buildLink(pr: any) {
    const categories = pr?.categories[0]
    let lastcat = categories.split('/')

    const url = categories
      .toLowerCase()
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .replace(/[-\s]+/g, '-')
      .replace(/[ &]/g, '-')

    lastcat = lastcat[lastcat.length - 2]

    return (
      <a
        href={url}
        className={handles.categoryLink}
        onClick={blocklink}
        onKeyPress={blocklink}
      >
        {lastcat}
      </a>
    )
  }

  return <div className={handles.categoryLinkContainer}>{mylink}</div>
}

export default ProductSummaryCategoryLink
