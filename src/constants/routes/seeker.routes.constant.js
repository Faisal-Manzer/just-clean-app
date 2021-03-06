import {lazy} from 'react';

export const SEEKER_COMMON_ROUTES = [
    {
        path: '/',
        title: 'seeker Home path',
        name: 'Home',
        icon: 'home',
        screen: lazy(() => import('screens/seeker/home.screen')),
    }, {
        path: '/jobs/',
        title: 'All jobs',
        name: 'Find jobs',
        icon: 'search',
        screen: lazy(() => import('screens/seeker/jobAvailable.screen')),
    }, {
        path: '/jobs/applied/',
        title: 'Applied jobs',
        name: 'Job Applied',
        icon: 'audit',
        screen: lazy(() => import('screens/seeker/jobApplied.screen')),
    }, {
        path: '/docs/',
        title: 'Training / Job Counselling Sessions',
        name: 'Training / Job Counselling Sessions',
        icon: 'book',
        screen: lazy(() => import('screens/seeker/documents.screen')),
    },
];

export const SEEKER_EXTRA_ROUTES = [
    {
        path: '/jobs/search/:hash/',
        title: 'All jobs',
        screen: lazy(() => import('screens/seeker/jobAvailable.screen')),
    },
    {
        path: '/payment-details/',
        title: 'Payment Details',
        screen: lazy(() => import('screens/seeker/payment.screen')),
    },
];
