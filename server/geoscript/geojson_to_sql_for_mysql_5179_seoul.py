# import geopandas as gpd
# import matplotlib.pyplot as plt
from pyproj import Transformer, transform
import json
import csv

# https://github.com/vuski/admdongkor 이곳의
# https://github.com/vuski/admdongkor/blob/master/ver20220701/HangJeongDong_ver20220701.geojson 자료를 사용하여 EPSG 5179
# 좌표계로 변환한 sql insert문을 생성합니다.
# 중심좌표는 https://github.com/vuski/admdongkor/blob/master/%ED%86%B5%EA%B3%84%EC%B2%ADMDIS%EC%9D%B8%EA%B5%AC%EC%9A%A9_%ED%96%89%EC%A0%95%EA%B2%BD%EA%B3%84%EC%A4%91%EC%8B%AC%EC%A0%90/coordinate_UTMK_%EC%9D%B4%EB%A6%84%ED%8F%AC%ED%95%A8.tsv
# 여기를 이용합니다.


# df = gpd.read_file("HangJeongDong_ver20220701_seoul.geojson")
# print(df.tail(30))
# df.plot(column="sggnm", categorical=True)
# plt.show()

with open("HangJeongDong_ver20220701_seoul.geojson", 'r') as geojson_file:
    geojson = json.load(geojson_file)

transformer_4326_5179 = Transformer.from_proj(4326, 5179)

with open("data.sql", 'w') as result_file:
    result_file.write(
        "INSERT IGNORE INTO address (created_at, updated_at, center_point, eupmyeondong, multi_polygon, sido, sigungu) \nVALUES ")
    for i, feature in enumerate(geojson["features"]):
        prop = feature["properties"]
        geometry = feature["geometry"]
        for polygon in geometry["coordinates"]:
            for line in polygon:
                for point in line:
                    past_x = point[0]
                    past_y = point[1]
                    transformed_coords = transformer_4326_5179.transform(past_y, past_x)
                    new_x = transformed_coords[1]
                    new_y = transformed_coords[0]
                    point[0] = new_x
                    point[1] = new_y

        result_file.write("(NOW(), NOW(), ")
        with open("coordinate_UTMK_이름포함_seoul.tsv", 'r') as tsv_file:
            tsv = csv.reader(tsv_file, delimiter='\t')

            is_found = False
            for row in tsv:
                if row[1] == prop["adm_cd2"]:
                    center_x = row[3]
                    center_y = row[4]
                    is_found = True

            if is_found:
                result_file.write("ST_GeomFromText('POINT(" + str(center_x) + " " + str(center_y) + ")', " + str(5179) + "), ")
            else:
                result_file.write("null, ")
        result_file.write("'" + prop["adm_nm"].replace(prop["sidonm"] + ' ' + prop["sggnm"] + ' ', '') + "'" + ', ')

        result_file.write("ST_GeomFromGeoJSON('" + json.dumps(geometry) + "', 4, 5179), ")

        result_file.write("'" + prop["sidonm"] + "', ")
        result_file.write("'" + prop["sggnm"] + "')")
        if i != len(geojson["features"]) - 1:
            result_file.write(", \n")
        else:
            result_file.write(';')
