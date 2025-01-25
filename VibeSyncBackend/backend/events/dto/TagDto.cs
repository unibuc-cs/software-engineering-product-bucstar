using backend.Models;

namespace backend.events.dto;

public class TagDto(
    string name)
{
    public string Name { get; init; } = name;

    public TagDto(Tag tag) : this(tag.Name)
    {
    }
}