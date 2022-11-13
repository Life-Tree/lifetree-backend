export enum IdType{
    CC = 1, 
    TI = 2,
    RC = 3,
    CE = 4
}

export enum VisitorsNames{
    LOGIN = 1, 
    LOGOUT = 2,
    SAVER = 3,
    ACTIVATER = 4
}

export enum RoleNames{
    ADMIN = 'Admin', 
    CITIZEN = 'Citizen'
}

export enum PermissionName{
    REPORT_CREATE = 'report.create', 
    REPORT_READ = 'report.read',
    USER_READ = 'user.read',
    MATERIAL_READ = 'material.read',
    MATERIAL_CREATE = 'material.create',
}