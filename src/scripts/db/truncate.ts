import map from "lodash/map"

import { modelsArr } from "../../models"

export default async function truncate() {
  await Promise.all(
    map(modelsArr, async (model) => {
      //@ts-ignore
      await model.destroy({ truncate: true, force: true })
    })
  )
}
