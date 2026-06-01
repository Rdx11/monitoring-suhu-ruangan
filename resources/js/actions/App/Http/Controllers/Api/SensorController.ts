import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\SensorController::store
* @see app/Http/Controllers/Api/SensorController.php:16
* @route '/api/sensor'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/sensor',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\SensorController::store
* @see app/Http/Controllers/Api/SensorController.php:16
* @route '/api/sensor'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SensorController::store
* @see app/Http/Controllers/Api/SensorController.php:16
* @route '/api/sensor'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SensorController::store
* @see app/Http/Controllers/Api/SensorController.php:16
* @route '/api/sensor'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SensorController::store
* @see app/Http/Controllers/Api/SensorController.php:16
* @route '/api/sensor'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\SensorController::latest
* @see app/Http/Controllers/Api/SensorController.php:63
* @route '/api/sensor/latest'
*/
export const latest = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: latest.url(options),
    method: 'get',
})

latest.definition = {
    methods: ["get","head"],
    url: '/api/sensor/latest',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SensorController::latest
* @see app/Http/Controllers/Api/SensorController.php:63
* @route '/api/sensor/latest'
*/
latest.url = (options?: RouteQueryOptions) => {
    return latest.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SensorController::latest
* @see app/Http/Controllers/Api/SensorController.php:63
* @route '/api/sensor/latest'
*/
latest.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: latest.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SensorController::latest
* @see app/Http/Controllers/Api/SensorController.php:63
* @route '/api/sensor/latest'
*/
latest.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: latest.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\SensorController::latest
* @see app/Http/Controllers/Api/SensorController.php:63
* @route '/api/sensor/latest'
*/
const latestForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: latest.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SensorController::latest
* @see app/Http/Controllers/Api/SensorController.php:63
* @route '/api/sensor/latest'
*/
latestForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: latest.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SensorController::latest
* @see app/Http/Controllers/Api/SensorController.php:63
* @route '/api/sensor/latest'
*/
latestForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: latest.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

latest.form = latestForm

/**
* @see \App\Http\Controllers\Api\SensorController::history
* @see app/Http/Controllers/Api/SensorController.php:88
* @route '/api/sensor/history'
*/
export const history = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
})

history.definition = {
    methods: ["get","head"],
    url: '/api/sensor/history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SensorController::history
* @see app/Http/Controllers/Api/SensorController.php:88
* @route '/api/sensor/history'
*/
history.url = (options?: RouteQueryOptions) => {
    return history.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SensorController::history
* @see app/Http/Controllers/Api/SensorController.php:88
* @route '/api/sensor/history'
*/
history.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SensorController::history
* @see app/Http/Controllers/Api/SensorController.php:88
* @route '/api/sensor/history'
*/
history.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: history.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\SensorController::history
* @see app/Http/Controllers/Api/SensorController.php:88
* @route '/api/sensor/history'
*/
const historyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: history.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SensorController::history
* @see app/Http/Controllers/Api/SensorController.php:88
* @route '/api/sensor/history'
*/
historyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: history.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SensorController::history
* @see app/Http/Controllers/Api/SensorController.php:88
* @route '/api/sensor/history'
*/
historyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: history.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

history.form = historyForm

const SensorController = { store, latest, history }

export default SensorController