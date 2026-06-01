import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ChartController::index
* @see app/Http/Controllers/ChartController.php:10
* @route '/chart'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/chart',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ChartController::index
* @see app/Http/Controllers/ChartController.php:10
* @route '/chart'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChartController::index
* @see app/Http/Controllers/ChartController.php:10
* @route '/chart'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChartController::index
* @see app/Http/Controllers/ChartController.php:10
* @route '/chart'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ChartController::index
* @see app/Http/Controllers/ChartController.php:10
* @route '/chart'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChartController::index
* @see app/Http/Controllers/ChartController.php:10
* @route '/chart'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChartController::index
* @see app/Http/Controllers/ChartController.php:10
* @route '/chart'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

const ChartController = { index }

export default ChartController