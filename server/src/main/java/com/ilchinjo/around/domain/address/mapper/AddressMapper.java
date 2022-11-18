package com.ilchinjo.around.domain.address.mapper;

import com.ilchinjo.around.domain.address.entity.Address;
import com.ilchinjo.around.domain.address.dto.AddressResponseDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    List<AddressResponseDto> entitiesToResponseDtoList(List<Address> addresses);
}
