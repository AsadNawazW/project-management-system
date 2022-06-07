// Import Models
import Role from "../models/Role";
import Permission from "../models/Permission";
import RolePermission from "../models/RolePermission";

async function initAcl(){

    let defaultRoles = [
        'user',
        'admin'
    ];
    
    let defaultPermissions = [
        'profile'
    ];
    
    let defaultRolePermissions = [
        
        'user:profile',    
        'admin:profile',        
        'admin:users.index',
        'admin:users.get',
        'admin:users.create',
        'admin:users.update',
        'admin:users.delete',
        'admin:users.role',
        'admin:roles.index',
        'admin:roles.get',
        'admin:roles.create',
        'admin:roles.update',
        'admin:roles.delete',
        'admin:permissions.index',
        'admin:permissions.get',
        'admin:permissions.create',
        'admin:permissions.update',
        'admin:permissions.delete',        
    ]

    
    let defaultPermission;
    let defaultRole;
    let defaultRolePermission;
    let defaultRolePermissionArray;

    for (const element of defaultRoles) {    

        defaultRole = await Role.findOne({ name : element });

        if (!defaultRole) {
            defaultRole = await Role.create({
                name: element
            });
        }
    }
   
    for (const element of defaultPermissions) 
    {    

        defaultPermission = await Permission.findOne({ name : element });
  
        if (!defaultPermission) {
            defaultPermission = await Permission.create({
                name: element
            });
        }
    }


    for (let defaultRolePermission of defaultRolePermissions) 
    {     

        defaultRolePermissionArray = defaultRolePermission.split(':')

        defaultRole = await Role.findOne({ name : defaultRolePermissionArray[0] });        
         
        if (!defaultRole) { 
            defaultRole = await Role.create({
                name: defaultRolePermissionArray[0]
            });
        }

        defaultPermission = await Permission.findOne({ name : defaultRolePermissionArray[1] });

        if (!defaultPermission) {  
            defaultPermission = await Permission.create({
                name: defaultRolePermissionArray[1]
            });
        }        

        defaultRolePermission = await RolePermission.findOne(
            {
                role : defaultRole,
                permission : defaultPermission 
            }
        );

        if (!defaultRolePermission) 
        {            
            defaultRolePermission = await RolePermission.create({
                role: defaultRole,
                permission: defaultPermission
            }); 

        }

    };
}


module.exports = { initAcl }


 
   