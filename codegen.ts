import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
   schema: "https://api-ca-central-1.hygraph.com/v2/clab1vqsj3h3d01tf2e7ud68l/master",
   documents: ['./operations/**/*.ts' ],
    overwrite: true,
    generates: {
        './operations/generated/graphql.tsx': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo',
            ],
            config: {
                skipTypename: false,
                withHooks: true,
                withHOC: false,
                withComponent: false,
            },
        },
        './graphql.schema.json': {
            plugins: ['introspection'],
        },
    },
}
export default config
