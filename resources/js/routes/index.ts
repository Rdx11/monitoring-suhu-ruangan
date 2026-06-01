import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../wayfinder'
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
})

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
})

logout.form = logoutForm

/**
* @see routes/web.php:15
* @route '/login'
*/
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:15
* @route '/login'
*/
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see routes/web.php:15
* @route '/login'
*/
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

/**
* @see routes/web.php:15
* @route '/login'
*/
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

/**
* @see routes/web.php:15
* @route '/login'
*/
const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url(options),
    method: 'get',
})

/**
* @see routes/web.php:15
* @route '/login'
*/
loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url(options),
    method: 'get',
})

/**
* @see routes/web.php:15
* @route '/login'
*/
loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

login.form = loginForm

/**
* @see \App\Http\Controllers\DashboardController::dashboard
* @see app/Http/Controllers/DashboardController.php:10
* @route '/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::dashboard
* @see app/Http/Controllers/DashboardController.php:10
* @route '/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::dashboard
* @see app/Http/Controllers/DashboardController.php:10
* @route '/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::dashboard
* @see app/Http/Controllers/DashboardController.php:10
* @route '/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DashboardController::dashboard
* @see app/Http/Controllers/DashboardController.php:10
* @route '/dashboard'
*/
const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::dashboard
* @see app/Http/Controllers/DashboardController.php:10
* @route '/dashboard'
*/
dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::dashboard
* @see app/Http/Controllers/DashboardController.php:10
* @route '/dashboard'
*/
dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

dashboard.form = dashboardForm

/**
* @see \App\Http\Controllers\ChartController::chart
* @see app/Http/Controllers/ChartController.php:10
* @route '/chart'
*/
export const chart = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: chart.url(options),
    method: 'get',
})

chart.definition = {
    methods: ["get","head"],
    url: '/chart',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ChartController::chart
* @see app/Http/Controllers/ChartController.php:10
* @route '/chart'
*/
chart.url = (options?: RouteQueryOptions) => {
    return chart.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChartController::chart
* @see app/Http/Controllers/ChartController.php:10
* @route '/chart'
*/
chart.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: chart.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChartController::chart
* @see app/Http/Controllers/ChartController.php:10
* @route '/chart'
*/
chart.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: chart.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ChartController::chart
* @see app/Http/Controllers/ChartController.php:10
* @route '/chart'
*/
const chartForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: chart.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChartController::chart
* @see app/Http/Controllers/ChartController.php:10
* @route '/chart'
*/
chartForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: chart.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChartController::chart
* @see app/Http/Controllers/ChartController.php:10
* @route '/chart'
*/
chartForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: chart.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

chart.form = chartForm

/**
* @see \App\Http\Controllers\RecapController::recap
* @see app/Http/Controllers/RecapController.php:12
* @route '/recap'
*/
export const recap = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recap.url(options),
    method: 'get',
})

recap.definition = {
    methods: ["get","head"],
    url: '/recap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RecapController::recap
* @see app/Http/Controllers/RecapController.php:12
* @route '/recap'
*/
recap.url = (options?: RouteQueryOptions) => {
    return recap.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RecapController::recap
* @see app/Http/Controllers/RecapController.php:12
* @route '/recap'
*/
recap.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recap.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RecapController::recap
* @see app/Http/Controllers/RecapController.php:12
* @route '/recap'
*/
recap.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: recap.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RecapController::recap
* @see app/Http/Controllers/RecapController.php:12
* @route '/recap'
*/
const recapForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: recap.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RecapController::recap
* @see app/Http/Controllers/RecapController.php:12
* @route '/recap'
*/
recapForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: recap.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RecapController::recap
* @see app/Http/Controllers/RecapController.php:12
* @route '/recap'
*/
recapForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: recap.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

recap.form = recapForm
