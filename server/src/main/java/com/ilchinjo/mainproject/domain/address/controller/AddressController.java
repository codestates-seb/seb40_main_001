package com.ilchinjo.mainproject.domain.address.controller;

import com.ilchinjo.mainproject.domain.address.dto.AddressResponseDto;
import com.ilchinjo.mainproject.domain.address.service.AddressService;
import com.ilchinjo.mainproject.global.dto.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/addresses")
public class AddressController {

    private final AddressService addressService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public MultiResponseDto<AddressResponseDto> getAddresses() {
        return MultiResponseDto.of(addressService.findAddresses());
    }

    @GetMapping("/{address-id}/nearby")
    @ResponseStatus(HttpStatus.OK)
    public MultiResponseDto<AddressResponseDto> getAddressesNearby(@PathVariable(name = "address-id") Long addressId) {
        return MultiResponseDto.of(addressService.findNearbyAddresses(addressId));
    }
}
