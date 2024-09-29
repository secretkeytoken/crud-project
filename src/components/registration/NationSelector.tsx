'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MapPin, MapPinHouse } from 'lucide-react';
import React, { useState, useCallback } from 'react';

interface Props {
  data: string[];
  onChange: (nation: string) => void;
}

const NationSelector: React.FC<Props> = ({ data, onChange }) => {
  const [nation, setNation] = useState('');
  const handleSelectNation = useCallback(
    (nation: string) => {
      setNation(nation);
      onChange(nation);
    },
    [onChange]
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={'lg'} variant={'default'}>
          <MapPinHouse className="size-4 mr-2" />
          {nation || 'Select your national'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        {data &&
          data?.map((item: string) => (
            <DropdownMenuItem
              key={item}
              onClick={() => handleSelectNation(item)}
            >
              <MapPin className="size-4 mr-2" />
              {item}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default React.memo(NationSelector);
