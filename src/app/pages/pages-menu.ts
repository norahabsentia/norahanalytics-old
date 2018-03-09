import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Retention Booster',
    icon: 'nb-compose',
    children: [
             {
                title: 'Overview',
                link: '/pages/retention-booster/user-churn/performance-analysis/performance-analysis-overview',
              },
              {
                title: 'User Origin Basis',
                link: '/pages/retention-booster/user-churn/performance-analysis/performance-analysis-user-origin-basis',
              },
              {
                title: 'User Behavior Basis',
                link: '/pages/retention-booster/user-churn/performance-analysis/performance-analysis-user-behavior-basis',
              }
      ]
    }
 
];