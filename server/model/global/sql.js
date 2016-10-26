// 查询抠抠镇运营后台用户
exports.SelectAdmin = function (adminEmail,adminPassword){
    var SqlStr;

    SqlStr = "SELECT " +
        "* " +
        "FROM " +
        "v6_kouclo_app.admin " +
        "where " +
        "v6_kouclo_app.admin.admin_email = '" + adminEmail+ "' and " +
        'v6_kouclo_app.admin.admin_password = ' + "MD5('" + adminPassword + "')";

    return SqlStr;
};

// 省市县镇村获取
// 省
exports.SelectRegionProvice = function (){
    var SqlStr;

    SqlStr = "SELECT " +
        "kouclo_region.position_provice.provice_name " +
        "FROM " +
        "kouclo_region.position_provice";

    return SqlStr;
};
// 市
exports.SelectRegionCity = function (Provice){
    var SqlStr;

    SqlStr = "SELECT " +
        "kouclo_region.position_city.city_name " +
        "FROM " +
        "kouclo_region.position_provice " +
        "left join " +
        "kouclo_region.position_city on " +
        "kouclo_region.position_city.provice_id = kouclo_region.position_provice.provice_id " +
        "where " +
        "kouclo_region.position_provice.provice_name = '" + Provice + "'";

    return SqlStr;
};
// 县
exports.SelectRegionCounty = function (Provice, City){
    var SqlStr;

    SqlStr = "SELECT " +
        "kouclo_region.position_county.county_name " +
        "FROM " +
        "kouclo_region.position_provice " +
        "left join " +
        "kouclo_region.position_city on " +
        "kouclo_region.position_city.provice_id = kouclo_region.position_provice.provice_id " +
        "left join " +
        "kouclo_region.position_county on " +
        "kouclo_region.position_county.city_id = kouclo_region.position_city.city_id " +
        "where " +
        "kouclo_region.position_provice.provice_name = '" + Provice + "' and " +
        "kouclo_region.position_city.city_name = '" + City + "'";

    return SqlStr;
};
// 镇
exports.SelectRegionTown = function (Provice, City, County){
    var SqlStr;

    SqlStr = "SELECT " +
        "kouclo_region.position_town.town_name " +
        "FROM " +
        "kouclo_region.position_provice " +
        "left join " +
        "kouclo_region.position_city on " +
        "kouclo_region.position_city.provice_id = kouclo_region.position_provice.provice_id " +
        "left join " +
        "kouclo_region.position_county on " +
        "kouclo_region.position_county.city_id = kouclo_region.position_city.city_id " +
        "left join " +
        "kouclo_region.position_town on " +
        "kouclo_region.position_town.county_id = kouclo_region.position_county.county_id " +
        "where " +
        "kouclo_region.position_provice.provice_name = '" + Provice + "' and " +
        "kouclo_region.position_city.city_name = '" + City + "' and " +
        "kouclo_region.position_county.county_name = '" + County + "'";

    return SqlStr;
};
// 村
exports.SelectRegionVillage = function (Provice, City, County, Town){
    var SqlStr;

    SqlStr = "SELECT " +
        "kouclo_region.position_village.village_name " +
        "FROM " +
        "kouclo_region.position_provice " +
        "left join " +
        "kouclo_region.position_city on " +
        "kouclo_region.position_city.provice_id = kouclo_region.position_provice.provice_id " +
        "left join " +
        "kouclo_region.position_county on " +
        "kouclo_region.position_county.city_id = kouclo_region.position_city.city_id " +
        "left join " +
        "kouclo_region.position_town on " +
        "kouclo_region.position_town.county_id = kouclo_region.position_county.county_id " +
        "left join " +
        "kouclo_region.position_village on " +
        "kouclo_region.position_village.town_id = kouclo_region.position_town.town_id " +
        "where " +
        "kouclo_region.position_provice.provice_name = '" + Provice + "' and " +
        "kouclo_region.position_city.city_name = '" + City + "' and " +
        "kouclo_region.position_county.county_name = '" + County + "' and " +
        "kouclo_region.position_town.town_name = '" + Town + "'";

    return SqlStr;
};
// check
exports.SelectRegionCheck = function (Provice, City, County, Town, Village){
    var SqlStr;

    SqlStr = "SELECT " +
        "kouclo_region.position_village.village_name " +
        "FROM " +
        "kouclo_region.position_provice " +
        "left join " +
        "kouclo_region.position_city on " +
        "kouclo_region.position_city.provice_id = kouclo_region.position_provice.provice_id " +
        "left join " +
        "kouclo_region.position_county on " +
        "kouclo_region.position_county.city_id = kouclo_region.position_city.city_id " +
        "left join " +
        "kouclo_region.position_town on " +
        "kouclo_region.position_town.county_id = kouclo_region.position_county.county_id " +
        "left join " +
        "kouclo_region.position_village on " +
        "kouclo_region.position_village.town_id = kouclo_region.position_town.town_id " +
        "where " +
        "kouclo_region.position_provice.provice_name = '" + Provice + "' and " +
        "kouclo_region.position_city.city_name = '" + City + "' and " +
        "kouclo_region.position_county.county_name = '" + County + "' and " +
        "kouclo_region.position_town.town_name = '" + Town + "' and " +
        "kouclo_region.position_village.village_name = '" + Village + "'";

    return SqlStr;
};

// 查询配送公司
exports.SelectExpress = function (){
    var SqlStr;

    SqlStr = "SELECT " +
        "v6_kouclo_business.express_delivery.express_name " +
        "FROM " +
        "v6_kouclo_business.express_delivery " +
        "order by " +
        "v6_kouclo_business.express_delivery.express_id";

    return SqlStr;
};