import { APICODES } from '../common/types'
import { TestType } from '../features/Tests/types'

export type ResTestsType = {
    response_code: APICODES,
    results: TestType[]
}
