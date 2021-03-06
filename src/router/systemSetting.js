const systemSetting = {
  path: '/',
  name: '/',
  component: () =>
    import('@/components/system-setting'),
  children: [{
      path: 'socialUnitManagement/:unitId',
      name: 'socialUnitManagement',
      component: () =>
        import('@/components/system-setting/social-unit-management'),
      props: true
    }, {
      path: 'socialUnitList',
      name: 'socialUnitList',
      component: () =>
        import('@/components/system-setting/social-unit-list')
    }, {
      path: 'enterpriseUserSetting',
      name: 'enterpriseUserSetting',
      component: () => import('@/components/system-setting/enterprise-user-setting')
    }, {
      path: 'registrationCode',
      name: 'registrationCode',
      component: () => import('@/components/system-setting/registration-code')
    },
    {
      path: 'userRightsManagement',
      name: 'userRightsManagement',
      component: () =>
        import('@/components/system-setting/user-rights-management'),
      children: [{
          path: "maintenanceStaff/:activeName/:activeId", //activeName--激活的tabName ativeId--激活的节点树id
          name: "maintenanceStaff",
          component: () =>
            import("@/components/system-setting/user-rights-management/maintenance-staff"),
          props: true
        },
        {
          path: "maintenanceStaffBasePropertyPage/:userListNodeId/:currentNodeId/:pageType/:userType",
          name: "maintenanceStaffBasePropertyPage",
          component: () =>
            import("@/components/system-setting/user-rights-management/maintenance-staff/maintenance-staff-base-property-page"),
          props: true
        }
      ]
    },

    { //电站设备管理
      name: 'stationDeviceManagement',
      path: 'stationDeviceManagement',
      component: () => import('@/components/system-setting/station-device-management')
    }
  ]
}

export default systemSetting
