import Router from 'vue-router'

import Prediction from './views/Prediction'
import Statistics from './views/Statistics'

export default new Router({
    routes:[
        {
            name:'prediction',
            path:'/prediction',
            component:Prediction
        },
        {
            name:'statistics',
            path:'/statistics',
            component:Statistics
        },
    ]
})