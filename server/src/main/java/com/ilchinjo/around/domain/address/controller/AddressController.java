package com.ilchinjo.around.domain.address.controller;

import com.ilchinjo.around.global.dto.MultiResponseDto;
import com.ilchinjo.around.domain.address.dto.AddressResponseDto;
import com.ilchinjo.around.domain.address.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

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
}
