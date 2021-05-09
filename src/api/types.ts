import { APICODES } from '../common/types'
import { TestType } from '../features/Tests/types'

export type ResGetTestsType = {
    response_code: APICODES,
    results: TestType[]
}
